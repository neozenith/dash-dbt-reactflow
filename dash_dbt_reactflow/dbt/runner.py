# Standard Library
import os
from typing import Union
from pathlib import Path

# Third Party
from dbt.cli.main import dbtRunner, dbtRunnerResult
from dbt.contracts.graph.manifest import Manifest
from dbt.contracts.results import (
    CatalogArtifact,
    RunExecutionResult,
)
from pprint import pprint as pp

import networkx as nx


EXCLUSIONS = [".DS_Store"]
ACCEPTED_COMMANDS = ["debug", "list", "parse", "compile", "build", "clean", "docs"]

PathLike = Union[str, Path]

class DbtManager:
    """Manage a folder collection of many dbt projects."""

    def __init__(self, projects_root: PathLike = Path("./dbt-projects") ) -> None:
        """Given a multi-dbt-project root folder, initialise the manager."""
        self._projects_root = projects_root
        self._project_paths = {
            d: Path(self._projects_root) / d 
            for d in os.listdir(self._projects_root) 
            if (Path(self._projects_root) / d).is_dir() and (Path(self._projects_root) / d / "dbt_project.yml").exists()
        }
        self.projects = {key: DbtProject(dbt_path) for key, dbt_path in self._project_paths.items()}



class DbtProject:
    def __init__(self, project_root: PathLike) -> None:
        self._project_root = project_root
        self.cli = dbtRunner()

    def run(self, dbt_command: Union[str, list[str]], project_dir: PathLike = None, profiles_dir: PathLike = None, environment: dict = {}):
        """Run a dbt command."""
        if dbt_command not in ACCEPTED_COMMANDS:
            raise ValueError(f"{dbt_command} should be one of {ACCEPTED_COMMANDS}.")
    
        if project_dir is None:
            project_dir = self._project_root

        if profiles_dir is None:
            profiles_dir = self._project_root

        if type(dbt_command) is list:
            cmd = dbt_command
        else:
            cmd = [dbt_command]

        if dbt_command == "docs":
            cmd = ["docs", "generate"]

        cmd = cmd + ["--project-dir", str(project_dir), "--profiles-dir", str(profiles_dir)]
        res: dbtRunnerResult = self.cli.invoke(cmd)
        

        # @dataclass
        # class dbtRunnerResult:
        # success: bool
        # exception: Optional[BaseException] = None
        # result: Union[
        #     bool,  # debug
        #     CatalogArtifact,  # docs generate
        #     List[str],  # list/ls
        #     Manifest,  # parse
        #     None,  # clean, deps, init, source
        #     RunExecutionResult,  # build, compile, run, seed, snapshot, test, run-operation
        # ] = None
        return res
    
    def debug(self, project_dir: PathLike = None, profiles_dir: PathLike = None, environment: dict = {}):
        return self.run("debug", project_dir, profiles_dir, environment)
    
    def list(self, project_dir: PathLike = None, profiles_dir: PathLike = None, environment: dict = {}):
        return self.run("list", project_dir, profiles_dir, environment)
    
    def parse(self, project_dir: PathLike = None, profiles_dir: PathLike = None, environment: dict = {}):
        res: Manifest = self.run("parse", project_dir, profiles_dir, environment).result
        return res
    
    def compile(self, project_dir: PathLike = None, profiles_dir: PathLike = None, environment: dict = {}):
        return self.run("compile", project_dir, profiles_dir, environment)
    
    def build(self, project_dir: PathLike = None, profiles_dir: PathLike = None, environment: dict = {}):
        return self.run("build", project_dir, profiles_dir, environment)
    
    def clean(self, project_dir: PathLike = None, profiles_dir: PathLike = None, environment: dict = {}):
        return self.run("clean", project_dir, profiles_dir, environment)
    
    def docs(self, project_dir: PathLike = None, profiles_dir: PathLike = None, environment: dict = {}):
        res: CatalogArtifact = self.run("docs", project_dir, profiles_dir, environment).result
        return res
    
   
    def reactflow_parse_graph(self, width=800, height=600):
        """Nodes and Edges required for Reactflow."""
        res = self.parse()
        nodes = []
        edges = []

        for k, v in res.nodes.items():
            node_type = k.split('.')[0]
            if node_type in ["model", "seed"]:
                nodes.append({
                    "id": k,
                    "data": {"label": f"<div>{k}</div><pre>{v.raw_code}</pre>", "type": node_type, "sql": v.raw_code},
                    "position": {"x":0, "y":0}
                })
                if hasattr(v.depends_on, 'nodes'):
                    for d in v.depends_on.nodes:
                        edges.append({
                            "id": "e:"+k+":"+d,
                            "source": d,
                            "target": k
                        })
        return (nodes, edges)




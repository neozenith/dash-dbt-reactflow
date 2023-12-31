import shutil
from invoke import task


@task
def format(c):
    """Autoformat code for code style."""
    c.run("black .")
    c.run("isort .")


@task
def lint(c):
    """Linting and style checking."""
    c.run("black --check .")
    c.run("isort --check .")
    c.run("flake8 .")


@task
def typecheck(c):
    """Run typechecking tooling."""
    c.run("mypy .")


@task
def test(c):
    """Run test suite."""
    c.run("python3 -m pytest")


@task
def build(c):
    """Build wheel."""
    shutil.rmtree("dist/", ignore_errors=True)
    c.run("python setup.py sdist bdist_wheel")


@task(pre=[lint, typecheck, test])
def ci(c):
    """Run linting and test suite for Continuous Integration."""
    ...

@task
def dev_db(c):
    """Start a dev postgres db using docker."""
    c.run("""
docker run -d \
	--name dash-dbt-reactflow-postgres \
    -p 5432:5432 \
    -e POSTGRES_DB=jaffle_shop \
    -e POSTGRES_USER=admin \
	-e POSTGRES_PASSWORD=mysecretpassword \
	postgres
          """)
    



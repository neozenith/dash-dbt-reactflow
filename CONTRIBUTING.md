# CONTRIBUTING

## Quick Start

### Code and Tools

```sh
git clone https://github.com/neozenith/dash-dbt-reactflow

# Setup a dbt project to interact with
cd dash-dbt-reactflow/dbt-projects
git clone https://github.com/dbt-labs/jaffle_shop

cd ..

# Setup dev tools
poetry shell
poetry install
npm install
```

### Test Database

Create a `dash-dbt-reactflow/dbt-projects/jaffle_shop/profiles.yml` file:

```yaml
jaffle_shop:
  target: dev
  outputs:
    dev:
      type: postgres
      host: localhost
      user: admin
      password: mysecretpassword
      port: 5432
      database: jaffle_shop
      schema: jaffle_shop
```


```sh
# Start a postgres database
inv dev-db
```

### Build loop

```sh
npm run build && python3 usage.py
```

You will edit `usage.py` for the example Dash application.

You will edit `src/lib/components/DashDbtReactflow.react.js` as the component.
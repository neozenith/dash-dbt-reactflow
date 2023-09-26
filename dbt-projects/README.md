# DBT Projects

This folder is ignored from git versioning but serves as a location to clone and manage dbt projects for demos.

## Get Started


### Create a sample dbt project

Fork the https://github.com/dbt-labs/jaffle_shop/ to your own Github org then run:

```sh
git clone https://github.com/<your_org_here>/jaffle_shop/ dbt-projects/jaffle_shop
```

### Create a sample profiles.yml

Create a `profiles.yml` file in `dbt-projects/jaffle_shop` with the following content:

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

### Create a local PostgreSQL database with Docker

Minimally start a postgres database to run your test examples against:

```sh
docker run -d \
	--name dash-dbt-reactflow-postgres \
    -p 5432:5432 \
    -e POSTGRES_DB=jaffle_shop \
    -e POSTGRES_USER=admin \
	-e POSTGRES_PASSWORD=mysecretpassword \
	postgres
```

If you want to mount the database storage to the host to persist changes after start / stop:

```sh
docker run -d \
	--name dash-dbt-reactflow-postgres \
    -p 5432:5432 \
    -e POSTGRES_DB=jaffle_shop \
    -e POSTGRES_USER=admin \
	-e POSTGRES_PASSWORD=mysecretpassword \
	-e PGDATA=/var/lib/postgresql/data/pgdata \
	-v ./dbt-data/:/var/lib/postgresql/data \
	postgres
```


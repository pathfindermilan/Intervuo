# Install UV for creating python environment
### Documentation : https://docs.astral.sh/uv/
### Steps : 
* Install with : ```curl -LsSf https://astral.sh/uv/install.sh | sh```
* If you are in the backend directory create the env using : ```uv sync```

# Run MYSQL Image for DB (MySQL)
```bash
docker run --name mysql-intervuo -e MYSQL_ROOT_PASSWORD="password" -e MYSQL_DATABASE="db-test" -p 3306:3306 -d mysql:latest
```

# Run PHPMYADMIN Image for managing the DB
```bash
docker run --name phpmyadmin-intervuo -d   --link mysql-intervuo:mysql-intervuo   -e PMA_HOST=mysql-intervuo   -e PMA_PORT=3306   -e MYSQL_ROOT_PASSWORD="password"   -p 8080:80   phpmyadmin/phpmyadmin
```

# Inspect the network ip of the MYSQL Image
```bash
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mysql-intervuo
```
* We will use this in django .env file

# Change the creds in .env
* ```cp .env.example .env```
* ```vi .env```
* Use the credentials and save the file

# Do the migrations
```python
python3 manage.py migrate
```

# Run the server
```python
python3 manage.py runserver 8000
```

# Access the backend server at localhost:8000 and phpadmin at localhost:8080

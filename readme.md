# Initialize Docker

docker run --name etecube-db  -e POSTGRES_PASSWORD=etecube -e POSTGRES_DB=etecube -d -p 5436:5432 postgres
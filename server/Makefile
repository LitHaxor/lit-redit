migrate:
	npx mikro-orm migration:create
dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
build-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml -d
build:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build

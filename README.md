<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://utfs.io/f/eiiA8GXc0v9SqLuNPUnvpTHYU6ftd3wqVrulk9QMG4cXSDx0" alt="Project logo"></a>
</p>

<h3 align="center">Nest x Next</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/Tutuacs/Nest_Next.svg)](https://github.com/Tutuacs/Nest_Next/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/Tutuacs/Nest_Next.svg)](https://github.com/Tutuacs/Nest_Next/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Few lines describing your project.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"> Nest_Next</a>

This is a Fullstack Base system, you can clone this repo and get a full-stack project with NestJs and NextJs using Refresh-Tokens and JWT, you can run it with Docker-Compose configured. Stop doing software from scratch and start using this base system.

## 🏁 Getting Started <a name = "getting_started">Nest_Next</a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them.


```bash
install Docker
```
Our database run by default on docker, you can change it if you want.

```bash
NodeJS -v 20.0^
```

```bash
NestJs 10.4^
```

### Installing

A step by step series of examples that tell you how to get a development env running.

Clone this Repo

```bash
git clone https://github.com/Tutuacs/Nest_Next.git && cd Nest_Next
```

Remove the default .git folder

```bash
rm -rf .git
```

Run docker compose

```bash
docker-compose up
```

Make a migration
```bash
npm  prisma migrate dev --name init
yarn prisma migrate dev --name init
pnpm prisma migrate dev --name init
```

Ready to use!


```link
http://localhost:3000
```

## 🎈 Usage <a name="usage">Nest_Next</a>

You can use Without Full-Docker!

#### Using Backend docker

You can Run the back inside the docker with the DB or without it. To run withour comment the ```full_stack_back``` service on the ```./api/docker-compose.yml``` file or paste this command.

```bash
sudo docker compose up full_stack_db | docker-compose up full_stack_db

```

To run back with the DB just paste this command.

```bash
sudo docker compose up -d --build | docker-compose up -d --build 
```

You can run manually Front and Back.(If you run manually check your Database connection on the ```./api/.env``` file)

```bash
cd api && npm  run dev
cd api && yarn run dev
cd api && pnpm run dev
```
Front:

```bash
cd client && npm  run dev
cd client && yarn run dev
cd client && pnpm run dev
```

## 🚀 Deployment <a name = "deployment">Nest_Next</a>

You can deploy on vercel BUT to deploy the Back-end you need to add the ./api/dir folder on your github repo. Actually Vercel dont build correctly NestJs, build your app manually and deploy the dist folder.

Add additional notes about how to deploy this on a live system.

## ⛏️ Built Using <a name = "built_using">Nest_Next</a>

- [PostgreSQL](https://www.postgresql.org/) - Database
- [NestJs](https://nestjs.com/) - Server Framework
- [NextJs](https://nextjs.org/) - Web Framework
- [Docker](https://docker.com/) - Container

## ✍️ Authors <a name = "authors">Tutuacs</a>

- [@Tutuacs](https://github.com/Tutuacs) - Idea & Initial work

See also the list of [contributors](https://github.com/Tutuacs/Nest_Next/contributors) who participated in this project.

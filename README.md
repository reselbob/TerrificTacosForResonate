# TerrificTacosForResonate
A project the demonstrates how to implement the Terrific Tacos workflow use case use the Resonate durable promises framework

# System Requirements

## The Go compiler.

Here are the installation instructions for Ubuntu:

```bash
sudo apt-get install build-essential -y

wget https://go.dev/dl/go1.21.1.linux-amd64.tar.gz

sudo tar -C /usr/local -xzf go1.21.1.linux-amd64.tar.gz

echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc

source ~/.bashrc

```

## The latest version of Node.JS and Typescript.

Here are the installation instructions for Ubuntu:

```bash
sudo apt update -y

curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -

sudo apt-get install -y nodejs

sudo npm install ts-node -g
```

# Building the Resonate Server

```bash
git clone https://github.com/resonatehq/resonate.git

cd resonate

go build -o resonate
```

# Starting the Resonate Server

```
./resonate serve
```

You'll get output similar to the following:

```bash
[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:	export GIN_MODE=release
 - using code:	gin.SetMode(gin.ReleaseMode)

[GIN-debug] GET    /promises                 --> github.com/resonatehq/resonate/internal/app/subsystems/api/http.(*server).searchPromises-fm (3 handlers)
[GIN-debug] GET    /promises/:id             --> github.com/resonatehq/resonate/internal/app/subsystems/api/http.(*server).readPromise-fm (3 handlers)
[GIN-debug] POST   /promises/:id/create      --> github.com/resonatehq/resonate/internal/app/subsystems/api/http.(*server).createPromise-fm (3 handlers)
[GIN-debug] POST   /promises/:id/cancel      --> github.com/resonatehq/resonate/internal/app/subsystems/api/http.(*server).cancelPromise-fm (3 handlers)
[GIN-debug] POST   /promises/:id/resolve     --> github.com/resonatehq/resonate/internal/app/subsystems/api/http.(*server).resolvePromise-fm (3 handlers)
[GIN-debug] POST   /promises/:id/reject      --> github.com/resonatehq/resonate/internal/app/subsystems/api/http.(*server).rejectPromise-fm (3 handlers)
time=2023-09-18T16:02:33.949Z level=INFO msg="starting grpc server" addr=0.0.0.0:50051
time=2023-09-18T16:02:33.950Z level=INFO msg="starting http server" addr=0.0.0.0:8001
time=2023-09-18T16:02:33.969Z level=INFO msg="starting metrics server" addr=:9090
^Ctime=2023-09-18T16:03:02.922Z level=INFO msg="shutdown signal recieved, shutting down" signal=interrupt
```

# Getting the Terrfic Tacos source code

```bash
git clone https://github.com/reselbob/TerrificTacosForResonate.git
```

# Running Terrfic Tacos for Resonate

```bash
TO BE PROVIDED
```

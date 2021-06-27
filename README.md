# Backend Webpack Template

This is a backend template for using webpack to transpile Typescript to a backend NodeJS service.  Because this is backend development, we will need a place to run this application.  Docker is used to package an image that can either be run locally, or deployed to the cloud.

This template repo packs quite a bit into a simple web server example:

* Typescript transpiling via webpack/babel for backend Node
* Docker image build using best practices for Node
* Google Cloud deployment

## Requirements

### Clone and set up the repo

All node dependencies are needed before beginning development.  The following commands will ensure those dependencies are installed:

1. ```git clone <repo_name>```
2. ```npm install```

### External commands and SDKs

The following commands and build tools are needed within this project:

* docker - for building the container image
* google-cloud-sdk - for pushing and deploying the container image

On Mac, brew can take care of these dependencies for us, YMMV on other platforms.

```
$ brew cask install google-cloud-sdk docker
```

## Development

Two npm scripts are available to either dynamically update as code changes or create a development build with source mapping and debugging capability.

To watch the code directory and update as things change use:

```
$ npm run start:dev
```

To create a development build in the `dist` folder use:

```
$ npm run build:dev
```
 
## Production Build

Scripts within npm are used to build the `dist` output folder via webpack and containerize it with docker.  To take this action in this project, use the following command:

```
$ npm run build:prd
```

This will output a static docker image with the name `backend-webpack-output`.  Renaming of this container can be done via the `tag` command within docker:

```
$ docker tag backend-webpack-output my-cool-project
```

## Deploy Locally

To run the container locally, the docker `run` command is used.  We also have to expose the port that the container is listening on, which in this case is 8080.

```
docker run -p 8080:8080 my-cool-project
```

## Deploy To The Cloud

Deploying to the cloud is a little more tricky.  A cloud provider must be chosen based on cost, complexity, and familiarity.  In the case of this project, Google Cloud was chosen due to having a clear free tier for running containers.  Google Cloud Run is a convenient and simple(ish) service for getting containers out on the web.

It should be noted that Google Cloud Run focuses on *stateless* containers.  This means that there is no persistence, and the container may be stopped when not in use.  This saves money, but also requires the use of external storage for state persistence.

### Set up Google Cloud SDK

While most cloud operations can be done via the web UI, it's more efficient to use the command line.  A few preliminary steps are needed to set this up.

#### Authentication

Google needs to know who we are, and authenticating with your Google account is facilitated with the following command:

```
$ gcloud auth login
```

#### Set Project ID
Google also needs to know which project context we are working in.  This can be obtained by logging into the web UI.

```
$ gcloud config set project <your-project-id>
```

### Push the container to Google Container Registry

Once the user and project are identified, the project container must be pushed up to Google's container registry to be used.  To do so the container must be tagged appropriately before using the docker command.

```
$ docker tag my-cool-project gcr.io/<your-project-id>/my-cool-project
$ docker push gcr.io/<your-project-id>/my-cool-project
```

Once successful, the final deploy step can be taken.

### Deploy the container in Google Cloud Run

The final step is to point Cloud Run to the image we've uploaded.  It's important to specify the region for which you've enabled Google Cloud Run services.  I am using us-central1 as it is the one of the main regions with free tier services.

```
$ gcloud run deploy my-cool-project --image gcr.io/<your-project-id>/my-cool-project --platform managed --region us-central1
```

After invoking this command you should see the following output:

```
Allow unauthenticated invocations to [my-cool-project] (y/N)?  y

Deploying container to Cloud Run service [my-cool-project] in project [REDACTED] region [us-central1]
✓ Deploying new service... Done.                                                                                                                  
  ✓ Creating Revision... Creating Service.                                                                                                        
  ✓ Routing traffic...                                                                                                                            
  ✓ Setting IAM Policy...                                                                                                                         
Done.                                                                                                                                             
Service [my-cool-project] revision [REDACTED] has been deployed and is serving 100 percent of traffic at https://my-cool-project-REDACTED-uc.a.run.app
```

# Troubleshooting
If there are missing declaration issues in Visual Studio Code, restart the Typescript server to see if it helps alleviate:

```
Command Palette -> Restart TS Server
```
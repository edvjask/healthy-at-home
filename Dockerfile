FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS publish
WORKDIR /src
COPY HealthyAtHomeAPI/HealthyAtHomeAPI.csproj ./

RUN dotnet restore "./HealthyAtHomeAPI.csproj" --runtime alpine-x64
COPY . .
RUN dotnet publish "./HealthyAtHomeAPI.csproj" -c Release -o /app/publish \
    --no-restore \
    --runtime alpine-x64 \
    --self-contained true \
    /p:PublishTrimmed=true \
    /p:PublishSingleFile=true 


FROM node:18-alpine3.16 AS build-web
COPY ./HealthyAtHomeAPI/Frontend/package.json /HealthyAtHomeAPI/Frontend/package.json
COPY ./HealthyAtHomeAPI/Frontend/package-lock.json /HealthyAtHomeAPI/Frontend/package-lock.json
WORKDIR /HealthyAtHomeAPI/Frontend
RUN npm ci
COPY ./HealthyAtHomeAPI/Frontend/ /HealthyAtHomeAPI/Frontend
RUN npm run build 

FROM mcr.microsoft.com/dotnet/runtime-deps:6.0-alpine AS final

#create new user and change directory ownership
RUN adduser --disabled-password \
    --home /app \
    --gecos '' dotnetuser && chown -R dotnetuser /app 
 
RUN apk upgrade musl

#impersonate into new user
USER dotnetuser
WORKDIR /app
EXPOSE 5000

COPY --from=publish /app/publish .
COPY --from=build-web /HealthyAtHomeAPI/Frontend/build ./wwwroot/

ENTRYPOINT ["./HealthyAtHome", "--urls", "http://0.0.0.0:5000"]


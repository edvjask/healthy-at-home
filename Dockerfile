FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs
WORKDIR /src
COPY ["HealthyAtHomeAPI/HealthyAtHomeAPI.csproj", "HealthyAtHomeAPI/"]
RUN dotnet restore "HealthyAtHomeAPI/HealthyAtHomeAPI.csproj"
COPY . .
WORKDIR "/src/HealthyAtHomeAPI"
RUN dotnet build "HealthyAtHomeAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "HealthyAtHomeAPI.csproj" -c Release -o /app/publish

FROM node:16 AS build-web
COPY ./HealthyAtHomeAPI/Frontend/package.json /HealthyAtHomeAPI/Frontend/package.json
COPY ./HealthyAtHomeAPI/Frontend/package-lock.json /HealthyAtHomeAPI/Frontend/package-lock.json
WORKDIR /HealthyAtHomeAPI/Frontend
RUN npm ci
COPY ./HealthyAtHomeAPI/Frontend/ /HealthyAtHomeAPI/Frontend
RUN npm run build

FROM base AS final

WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=build-web /HealthyAtHomeAPI/Frontend/build ./wwwroot/
ENTRYPOINT ["dotnet", "HealthyAtHomeAPI.dll"]


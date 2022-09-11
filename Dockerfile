FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine3.16 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["HealthyAtHomeAPI/HealthyAtHomeAPI.csproj", "HealthyAtHomeAPI/"]
RUN dotnet restore "HealthyAtHomeAPI/HealthyAtHomeAPI.csproj"
COPY . .
WORKDIR "/src/HealthyAtHomeAPI"
RUN dotnet build "HealthyAtHomeAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "HealthyAtHomeAPI.csproj" -c Release -o /app/publish

FROM node:18-alpine3.16 AS build-web
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


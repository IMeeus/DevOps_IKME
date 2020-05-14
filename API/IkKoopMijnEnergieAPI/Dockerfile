FROM mcr.microsoft.com/dotnet/core/aspnet:2.2 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:2.2 AS build
WORKDIR /src
COPY ["IkKoopMijnEnergieAPI.csproj", "./"]
RUN dotnet restore "./IkKoopMijnEnergieAPI.csproj"
COPY . .
RUN dotnet build "IkKoopMijnEnergieAPI.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "IkKoopMijnEnergieAPI.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "IkKoopMijnEnergieAPI.dll"]


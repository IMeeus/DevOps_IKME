FROM mcr.microsoft.com/dotnet/core/sdk:2.2-bionic
RUN apt-get update
RUN apt-get install git
WORKDIR /src
RUN git clone https://maeleeuxs%40gmail.com:Peerappe304%21@github.com/IMeeus/DevOps_IKME.git
WORKDIR /src/DevOps_IKME/API/IkKoopMijnEnergieAPI
RUN dotnet restore IkKoopMijnEnergieAPI.csproj
RUN dotnet build IkKoopMijnEnergieAPI.csproj -c Release -o /app
RUN dotnet publish IkKoopMijnEnergieAPI.csproj -c Release -o /app
WORKDIR /app
ENTRYPOINT ["dotnet", "IkKoopMijnEnergieAPI.dll"]

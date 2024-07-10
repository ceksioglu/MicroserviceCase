# Microservice Architecture Test Project

This project is designed to test out a microservice architecture using a combination of a C# console application, a Web API, RabbitMQ as a message broker, and a React frontend. The project demonstrates how different components of a microservice architecture can communicate and work together.

## Components

### Console Application

- **Purpose**: Receives messages from RabbitMQ and prints them to the console.
- **Location**: `backend/console-app/ConsoleApp`

### Web API

- **Purpose**: Accepts data from the React frontend and sends it to RabbitMQ.
- **Location**: `backend/web-api/WebApiProject`
- **Endpoints**:
  - `GET /api/message/test`: Checks if the API is working.
  - `POST /api/message/send`: Sends data to RabbitMQ.

### RabbitMQ

- **Purpose**: Acts as a message broker to facilitate communication between the Web API and the console application.
- **Location**: `backend/rabbitmq`

### React Frontend

- **Purpose**: Provides a user interface to input data, which is then sent to the Web API.
- **Location**:  `frontend`

## Setup Instructions

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/)
- [RabbitMQ](https://www.rabbitmq.com/download.html)

### Running the Project

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/yourusername/MicroserviceCase.git
   cd MicroserviceCase


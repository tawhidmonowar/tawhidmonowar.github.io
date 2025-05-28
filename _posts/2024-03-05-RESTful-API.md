---
title: RESTful API
description: A RESTful API (Representational State Transfer API) is an architectural style for designing networked applications. It uses HTTP methods to interact with resources identified by URIs (Uniform Resource Identifiers). RESTful APIs are stateless, meaning each call from a client contains all the information needed to process the request.
author: tawhidmonowar
date: 2024-03-05 11:00:00 +06:00
categories: [Development, RESTful API]
---

![rest-api-model-diagram](/assets/img/posts/rest-api-model-diagram.jpg)

## Key Principles of REST

**1. Statelessness:** One of the fundamental principles of REST is that each request from a client to a server must contain all the information required to understand and process that request. This means that the server should not store any information about the client’s state between requests. Each request must be independent.

**2. Resources:** In a RESTful system, resources are at the core. Resources are represented by URLs, and each resource should have a unique URL. For example, a RESTful API for a bookstore might have resources like `/books`, `/authors`, and `/categories`.

**3. HTTP Methods:** REST relies on HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, etc.) to perform operations on resources. These methods have specific meanings. For example, `GET` is used to retrieve data, `POST` to create new resources, PUT to update existing resources, and `DELETE` to remove them.

**4. Representation:** Resources are typically represented in various formats, such as `JSON` or `XML`. Clients can specify their preferred representation format using HTTP headers like “Accept.”

**5. Stateless Communication:** Each request from a client to the server must be independent, and the server should not store any client state. This design principle makes REST highly scalable and reliable.

## Understanding RESTful API Design

A RESTful API is an interface that allows different software systems to communicate with each other over HTTP using the principles of REST. Here are some essential aspects of designing RESTful APIs:

**1. Use Nouns for Resource URLs:** Resource URLs should use nouns to represent resources. For example, `/books` is a good URL for a collection of books, and `/books/123` is suitable for a specific book with ID 123.

**2. HTTP Methods for Actions:** Use HTTP methods to perform actions on resources. For example, use `POST` to create a new resource, `PUT` to update it, `GET` to retrieve it, and `DELETE` to remove it.

**3. Status Codes:** Use appropriate HTTP status codes to indicate the outcome of an API request. For instance, a `200` status code signifies success, while a `404` status code indicates that the requested resource was not found.

**4. Versioning:** It’s a good practice to include a version number in your API URL, e.g., `/v1/books`. This allows you to make changes to the API while maintaining backward compatibility for existing clients.

## HTTP Status Codes in REST API

### 1xx – Informational

| Code | Meaning                      | Description |
|:-----|:-----------------------------|:------------|
| 100  | Continue                     | Request received, continue process |
| 101  | Switching Protocols          | Protocol change accepted |
| 102  | Processing (WebDAV)          | Server is processing request |

---

### 2xx – Success

| Code | Meaning                      | Description |
|:-----|:-----------------------------|:------------|
| 200  | OK                           | Request succeeded |
| 201  | Created                      | Resource created (e.g., POST success) |
| 202  | Accepted                     | Request accepted for processing (but not completed yet) |
| 203  | Non-Authoritative Information | Metadata may be from third-party |
| 204  | No Content                   | Success, but no data returned (e.g., DELETE) |
| 205  | Reset Content                | Success, client should reset form/view |
| 206  | Partial Content              | Partial response for range requests (e.g., for file download) |

---

### 3xx – Redirection

| Code | Meaning                      | Description |
|:-----|:-----------------------------|:------------|
| 300  | Multiple Choices             | More than one resource (not commonly used) |
| 301  | Moved Permanently            | Resource URL has changed |
| 302  | Found                        | Temporary redirection |
| 303  | See Other                    | Get resource from a different URI |
| 304  | Not Modified                 | Use cached version |
| 307  | Temporary Redirect           | Use another URI temporarily |
| 308  | Permanent Redirect           | Resource moved permanently to another URI |

---

### 4xx – Client Error

| Code | Meaning                      | Description |
|:-----|------------------------------|:------------|
| 400  | Bad Request                  | Invalid syntax or parameters |
| 401  | Unauthorized                 | Authentication required |
| 403  | Forbidden                    | Authenticated but no permission |
| 404  | Not Found                    | Resource doesn’t exist |
| 405  | Method Not Allowed           | HTTP method not supported |
| 406  | Not Acceptable               | Resource not acceptable as per Accept headers |
| 408  | Request Timeout              | Client took too long to send request |
| 409  | Conflict                     | Resource conflict (e.g., duplicate entry) |
| 410  | Gone                         | Resource permanently deleted |
| 413  | Payload Too Large            | Request body too big |
| 415  | Unsupported Media Type       | Media type not supported (e.g., expecting JSON) |
| 429  | Too Many Requests            | Rate limit exceeded |

---

### 5xx – Server Error

| Code | Meaning                      | Description |
|:-----|:-----------------------------|:------------|
| 500  | Internal Server Error        | Generic server error |
| 501  | Not Implemented              | Method not implemented on server |
| 502  | Bad Gateway                  | Invalid response from upstream server |
| 503  | Service Unavailable          | Server is temporarily overloaded or under maintenance |
| 504  | Gateway Timeout              | Upstream server didn't respond in time |
| 505  | HTTP Version Not Supported   | Server doesn't support HTTP version used |

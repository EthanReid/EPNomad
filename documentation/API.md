# API

### What is an API?

API stands for application programming interface. Typically, APIs allow you to utilize different services on other people's servers like how Facebook has an API for checking likes on posts or how Nomad has an API to update your train.

### Routes

The restricted methods require the use of a header: `Authorization: Bearer <token>` where token is the token you obtain from the route `/api/oauth/token`

| Route                                    | Method | Headers                                          | Parameters                           | Response                                                               |
|------------------------------------------|--------|--------------------------------------------------|--------------------------------------|------------------------------------------------------------------------|
| /api/oauth/token                         | POST         | Authorization: Basic "base64(userId:userSecret)" | { grant\_type: "client_credentials" } | token                                                                 |
| /api/projects/restricted                 | GET          | Restricted                                       |                                      | {"success": "Yay, you successfully accessed the restricted resource!"} |
| /api/projects/:project_id/detect         | POST         | Restricted                                       | base64                               | project                                                                |
| /api/projects/:project_id/models/add     | POST         | Restricted                                       | base64                               | project                                                                |
| /api/projects/:project_id/models/remove  | POST         | Restricted                                       | _id                                  | project                                                                |
| /api/projects/:project_id                | GET          | Restricted                                       |                                      | project                                                                |
| /api/projects/:project_id/train          | POST         | Restricted                                       |                                      | success or err                                                         |
| /api/projects                            | GET          | Restricted                                       |                                      | projects                                                               |

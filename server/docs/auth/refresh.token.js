module.exports = {
    post: {
        tags: ['Auth'],
        summary: 'Refresh user token',
        parameters: [
            {
                in: 'body',
                name: 'refreshToken',
                schema: {
                    type: 'object',
                    required: ['refreshToken'],
                    properties: {
                        refreshToken: {
                            type: 'string',
                            description: 'Refresh token in user session'    
                        }
                    }
                }
            }
        ],
        responses: {
            200: {
                description: 'Response Success (Session)',
                schema: {
                    $ref: '#/definitions/Session'
                }
            },
            default: {
                description: 'Unexpected error',
                schema: {
                    $ref: '#/definitions/Error'
                }
            }
        },
    }
}
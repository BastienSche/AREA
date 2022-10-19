module.exports = {
    post: {
        tags: ['Auth'],
        summary: 'Login authentification for the user',
        parameters: [
            {
                in: 'body',
                name: 'localAuth',
                require: false,
                schema: {
                    type: 'object',
                    required: ['provider'],
                    properties: {
                        provider: {
                            type: 'string',
                            description: 'Provider type',
                            example: 'local'
                        },
                        email: {
                            type: 'string',
                            description: 'The user email',
                            example: 'admin@master'
                        },
                        password: {
                            type: 'string',
                            description: 'The user password',
                            example: '_p@ssWd110'           
                        }
                    }
                }
            }
        ],
        responses: {
            200: {
                type: 'object',
                description: 'Response Success (Session)',
                schema: {
                    required: ['status', 'error'],
                    properties: {
                        status: {
                            type: 'int',
                            description:  'API response status',
                            example: 200
                        },
                        error: {
                            type: 'boolean',
                            description: 'Error boolean value',
                            example: false
                        },
                        session: {
                            $ref: '#/definitions/Session'
                        }
                    }
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
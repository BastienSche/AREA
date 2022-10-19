module.exports = {
    post: {
        tags: ['User'],
        summary: 'Create new user',
        parameters: [
            {
                name: 'userModel',
                in: 'body',
                type: 'object',
                required: true,
                properties: {
                    firstName: {
                        type: 'string',
                        description: 'User firstName',
                        example: 'Benoit'
                    },
                    lastName: {
                        type: 'string',
                        description: 'User lastName',
                        example: 'Michel'
                    },
                    email: {
                        type: 'string',
                        description: 'User email',
                        example: 'Michel'
                    },
                    password: {
                        type: 'string',
                        description: 'User password',
                        example: '_p@ssw0rd321'
                    }
                }
            }
        ],
        responses: {
            201: {
                description: 'Response Success (User)',
                schema: {
                    required: ['status', 'error'],
                    properties: {
                        status: {
                            type: 'int',
                            description:  'API response status',
                            example: 201
                        },
                        error: {
                            type: 'boolean',
                            description: 'Error boolean value',
                            example: false
                        },
                        user: {
                            $ref: '#/definitions/User'
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
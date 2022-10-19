module.exports = {
    patch: {
        tags: ['User'],
        summary: 'Update user password',
        parameters: [
            {
                name: 'id',
                in: 'path',
                type: 'string',
                required: true,
                description: 'The user uuid'
            },
            {
                name: 'passwordModel',
                in: 'body',
                type: 'object',
                required: true,
                properties: {
                    passwordOld: {
                        type: 'string',
                        description: 'Old password',
                    },
                    password: {
                        type: 'string',
                        description: 'New password',
                    },
                    passwordCf: {
                        type: 'string',
                        description: 'New password confirmation',
                    }
                }
            }
        ],
        responses: {
            200: {
                description: 'Response Success',
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
module.exports = {
    patch: {
        tags: ['User'],
        summary: 'Update user personal informations',
        parameters: [
            {
                name: 'id',
                in: 'path',
                type: 'string',
                required: true,
                description: 'The user uuid'
            },
            {
                name: 'infoModel',
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
                        example: 'benoit.michel@gmail.com'
                    }
                }
            }
        ],
        responses: {
            200: {
                description: 'Response Success (User)',
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
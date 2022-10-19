module.exports = {
    put: {
        tags: ['User'],
        summary: 'Update all user attributes',
        parameters: [
            {
                name: 'User Model',
                in: 'body',
                require: true,
                schema: {
                    $ref: '#/definitions/User'
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
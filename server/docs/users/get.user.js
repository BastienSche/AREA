module.exports = {
    get: {
        tags: ['User'],
        summary: 'Returns user informations',
        parameters: [
            {
                name: 'id',
                in: 'path',
                type: 'string',
                required: true,
                description: 'The user uuid'
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
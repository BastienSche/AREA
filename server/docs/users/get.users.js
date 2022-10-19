module.exports = {
    get: {
        tags: ['User'],
        summary: 'Returns the list of all the users',
        responses: {
            200: {
                description: 'Response Success (Users)',
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
                        users: {
                            $ref: '#/definitions/Users'
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
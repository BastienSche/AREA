module.exports = {
    get: {
        tags: ['Service'],
        summary: 'Return the list of available services',
        responses: {
            200: {
                type: 'object',
                description: 'Response Success (Services)',
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
                        services: {
                            $ref: '#/definitions/Service'
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
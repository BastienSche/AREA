module.exports = {
    patch: {
        tags: ['User'],
        summary: 'Update user provider',
        parameters: [
            {
                name: 'id',
                in: 'path',
                type: 'string',
                required: true,
                description: 'The user uuid'
            },
            {
                name: 'providerModel',
                in: 'body',
                type: 'object',
                required: true,
                properties: {
                    provider: {
                        type: 'string',
                        description: 'Old password',
                        example: 'discord'
                    },
                    data: {
                        type: 'object',
                        description: 'Provider data',
                        example: {
                            $ref: '#/definitions/DiscordData/properties'
                        }
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
module.exports = {
    post: {
        tags: ['Area'],
        summary: 'Create new Erea for the user',
        parameters: [
            {
                in: 'body',
                name: 'areaModel',
                require: true,
                schema: {
                    type: 'object',
                    required: ['action', 'reaction'],
                    properties: {
                        title: {
                            type:'string',
                            example: 'Macro: Discord Action to Discord REAction'
                        },
                        action: {
                            type: 'object',
                            description: 'Define the action component',
                            properties: {
                                service: {
                                    type: 'string',
                                    example: 'discord'
                                },
                                name: {
                                    type: 'string',
                                    example: 'new_message_in_group'
                                }
                            }
                        },
                        reaction: {
                            type: 'object',
                            description: 'Define the reaction component',
                            properties: {
                                service: {
                                    type: 'string',
                                    example: 'discord'
                                },
                                name: {
                                    type: 'string',
                                    example: 'like_message'
                                }
                            }
                        }
                    }
                }
            }
        ],
        responses: {
            201: {
                type: 'object',
                description: 'Response Success (Area)',
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
                            $ref: '#/definitions/Area'
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
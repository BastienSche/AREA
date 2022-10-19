module.exports = {
    definitions: {
        User: {
            required: [
                'id',
                'email',
                'lastName',
                'firstName'
            ],
            properties: {
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Unique auto-generated user uuid in v4 format',
                    example: '9fefeeb6-a084-4377-a5e3-85200f36453e'
                },
                email: {
                    type: 'string',
                    description: 'User private email address',
                    example: 'benoit.michel@gmail.com'
                },
                firstName: {
                    type: 'string',
                    description: 'User first name',
                    example: 'Benoit'
                },
                lastName: {
                    type: 'string',
                    description: 'User last name',
                    example: 'Ricardo'
                },
                role: {
                    type: 'string',
                    description: 'User role',
                    example: 'Member'
                },
                discordData: {
                    $ref: '#/definitions/DiscordData'
                }
            }
        },

        Users: {
            type: 'array',
            items: {
                $ref: '#/definitions/User'
            }
        },

        Session: {
            type: 'object',
            required: [
                'accessToken',
                'refreshToken',
                'id'
            ],
            properties: {
                accessToken: {
                    type: 'string',
                    description: 'User access token'
                },
                refreshToken: {
                    type: 'string',
                    description: 'User refresh token'
                },
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'User uuid',
                    example: '9fefeeb6-a084-4377-a5e3-85200f36453e'
                }
            }
        },

        Error: {
            type: 'object',
            required: [
                'status',
                'error',
                'code',
                'message'
            ],
            properties: {
                status: {
                    type: 'int',
                    description:  'API response status',
                    example: 500
                },
                code: {
                    type: 'string',
                    description: 'Error string code',
                    example: 'UNKNOWN_ERROR'
                },
                error: {
                    type: 'boolean',
                    description: 'Error boolean value',
                    example: true
                },
                message: {
                    type: 'string',
                    description: 'Error message specifying',
                    example: 'Internal Server Error..'
                }
            }
        },

        DiscordData: {    
            type: 'object',
            required: [
                'id',
                'email',
                'avatar',
                'useranme',
                'accessToken',
                'refreshToken'
            ],
            properties: {
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Discord profil id'
                },
                email: {
                    type: 'string',
                    description: 'Discord email'
                },
                avatar: {
                    type: 'string',
                    description: 'Discord avatar'
                },
                username: {
                    type: 'string',
                    description: 'Discord username'
                },
                accessToken: {
                    type: 'string',
                    description: 'Discord private access token'
                },
                refreshToken: {
                    type: 'string',
                    description: 'Discord private refresh token'
                }
            }
        },

        Area: {    
            type: 'object',
            required: [
                'id',
                'title',
                'owner',
                'status',
                'action',
                'reaction'
            ],
            properties: {
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Area id'
                },
                title: {
                    type: 'string',
                    description: 'Area title'
                },
                owner: {
                    type: 'string',
                    description: 'Area owner'
                },
                status: {
                    type: 'string',
                    description: 'Area status'
                },
                action: {
                    type: 'object',
                    description: 'Action component',
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
                    description: 'REAction component',
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
        },

        Service: {    
            type: 'object',
            required: [
                'id',
                'name',
                'actions',
                'reactions'
            ],
            properties: {
                id: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Service id',
                },
                name: {
                    type: 'string',
                    description: 'Service name',
                    example: 'discord'
                },
                actions: {
                    type: 'array',
                    items: {
                        type: 'object',
                        description: 'Available service Actions',
                        properties: {
                            name: {
                                type: 'string',
                                description: 'Action name',
                                example: 'new_message_in_group'
                            },
                            description: {
                                type: 'string',
                                description: 'Action description',
                                example: 'A new message posted in group'
                            }
                        }
                    }
                },
                reactions: {
                    type: 'array',
                    items: {
                        type: 'object',
                        description: 'Available service REActions',
                        properties: {
                            name: {
                                type: 'string',
                                description: 'REAction name',
                                example: 'like_message'
                            },
                            description: {
                                type: 'string',
                                description: 'REAction description',
                                example: 'The user likes a message'
                            }
                        }
                    }
                }
            }
        }

    }
}
module.exports = {
    post: {
        tags: ['Auth'],
        summary: 'Registartion for the user',
        parameters: [
            {
                in: 'body',
                name: 'informations',
                schema: {
                    type: 'object',
                    required: ['firstName', 'firstName', 'password', 'passwordCf', 'email', 'password'],
                    properties: {
                        firstName: {
                            type: 'string',
                            description: 'The user first name',
                            example: 'Benoit'
                        },
                        lastName: {
                            type: 'string',
                            description: 'The user last name',
                            example: 'Ricardo'
                        },
                        email: {
                            type: 'string',
                            description: 'The user email',
                            example: 'defaultuser@gmail.com'
                        },
                        password: {
                            type: 'string',
                            description: 'The user password',
                            example: '_p@ssWd110'           
                        },
                        passwordCf: {
                            type: 'string',
                            description: 'The user confirm password',
                            example: '_p@ssWd110'           
                        }
                    }
                }
            }
        ],
        responses: {
            201: {
                description: 'Response Success (Session)',
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
                        session: {
                            $ref: '#/definitions/Session'
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
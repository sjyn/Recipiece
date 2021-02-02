class BaseApiException(Exception):
    def __init__(self, errorCode: int, message: str = None):
        self.errorCode = errorCode
        self.message = message or 'Unknown Error'


class ConflictException(BaseApiException):
    def __init__(self):
        super(ConflictException, self).__init__(409, 'Entity already exists')


class NotFoundException(BaseApiException):
    def __init__(self):
        super(NotFoundException, self).__init__(404, 'Entity not found')
        
        
class ForbiddenException(BaseApiException):
    def __init__(self):
        super(ForbiddenException, self).__init__(403, 'Access Denied')


class UnauthorizedException(BaseApiException):
    def __init__(self):
        super(UnauthorizedException, self).__init__(401, 'Unauthorized')

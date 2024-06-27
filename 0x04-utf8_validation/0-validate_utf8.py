#!/usr/bin/python3
'''interview module'''


def validUTF8(data):
    '''checks if data is utf8 encoded'''
    def is_continuation(byte):
    '''Helper function to check if a byte is a valid continuation byte'''
        return (byte & 0b11000000) == 0b10000000

    i = 0
    while i < len(data):
        # Get the number of bytes for the current character
        first_byte = data[i]
        if (first_byte & 0b10000000) == 0:
            # 1-byte character
            bytes_count = 1
        elif (first_byte & 0b11100000) == 0b11000000:
            # 2-byte character
            bytes_count = 2
        elif (first_byte & 0b11110000) == 0b11100000:
            # 3-byte character
            bytes_count = 3
        elif (first_byte & 0b11111000) == 0b11110000:
            # 4-byte character
            bytes_count = 4
        else:
            # Invalid first byte
            return False

        # Check if we have enough bytes for this character
        if i + bytes_count > len(data):
            return False

        # Check continuation bytes
        for j in range(i + 1, i + bytes_count):
            if not is_continuation(data[j]):
                return False

        i += bytes_count

    return True

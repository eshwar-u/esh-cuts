from configparser import ConfigParser

def config(filename = "src\components\database.ini", section = "postgresql"):
    parser = ConfigParser()
    print("past parser statement")
    parser.read(filename)
    print("past filename statement")
    db = {}
    print("sections:", parser.sections())
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception('Section {0} is not found in {1} file.'.format(section, filename))
    return db
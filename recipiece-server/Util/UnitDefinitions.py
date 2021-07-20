from Database import Models


class UnitDefinitions:
    GRAMS = Models.UnitDefinition(
        abbr='g',
        full='grams',
        measureType='weight'
    )

    CUPS = Models.UnitDefinition(
        abbr='C',
        full='cups',
        measureType='volume'
    )

    OUNCES = Models.UnitDefinition(
        abbr='oz',
        full='ounces',
        measureType='weight'
    )

    POUNDS = Models.UnitDefinition(
        abbr='lbs',
        full='pounds',
        measureType='weight'
    )

    TEASPOONS = Models.UnitDefinition(
        abbr='tsp',
        full='teaspoon',
        measureType='volume'
    )

    TABLESPOONS = Models.UnitDefinition(
        abbr='tbsp',
        full='tablespoon',
        measureType='volume'
    )

    FLUID_OUNCES = Models.UnitDefinition(
        abbr='fl. oz',
        full='fluid ounces',
        measureType='volume'
    )

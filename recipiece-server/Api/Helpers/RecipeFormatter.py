import re
import time

import ingreedypy
import recipe_scrapers

from Database import Models


class RecipeFormatter:
    andedFraction = r"(\d+) *and *(\d+/\d+)"
    lenPattern = r"(\d+) *(hours?|minutes?|seconds?|days?|weeks?)"

    @classmethod
    def parseScraperIntoRecipe(cls, url: str, userId: str) -> Models.Recipe:
        scraper = recipe_scrapers.scrape_me(url, wild_mode=True)
        return Models.Recipe(
            name=scraper.title(),
            ingredients=cls._parseIngsFromScraper(scraper),
            steps=cls._parseStepsFromScraper(scraper),
            description=cls._parseDescriptionFromScraper(url, scraper),
            private=False,
            created=int(time.time()),
            owner=userId,
            advanced=Models.RecipeAdvancedOptions(
                highAltitude=False
            )
        )

    @classmethod
    def _parseDescriptionFromScraper(cls, url: str, scraper) -> str:
        des = f'Recipe sourced from {url}.'
        if scraper.author() is not None:
            des += f' Written by {scraper.author()}.'
        if scraper.yields() is not None:
            des += f' Yields {scraper.yields()}.'
        return des

    @classmethod
    def _parseStepsFromScraper(cls, scraper) -> [Models.RecipeStep]:
        rcpSteps = []

        for step in scraper.instructions().split('\n'):
            stepLen = Models.RecipeStepLength(
                time=0,
                unit='m'
            )
            potentialLenMatches = re.search(cls.lenPattern, step.strip(), re.IGNORECASE)
            if potentialLenMatches is not None:
                foundMatches = potentialLenMatches.groups()
                if len(foundMatches) >= 2:
                    timeUnit = None
                    rawUnit = foundMatches[1].lower()
                    if rawUnit.find('minute') != -1:
                        timeUnit = 'm'
                    elif rawUnit.find('hour') != -1:
                        timeUnit = 'h'
                    elif rawUnit.find('second') != -1:
                        timeUnit = 's'
                    elif rawUnit.find('week') != -1:
                        timeUnit = 'w'
                    elif rawUnit.find('day') != -1:
                        timeUnit = 'd'
                    if timeUnit is not None:
                        stepLen = Models.RecipeStepLength(
                            time=int(foundMatches[0]),
                            unit=timeUnit,
                        )
            rcpSteps.append(Models.RecipeStep(
                content=step.strip(),
                length=stepLen,
            ))
        return rcpSteps

    @classmethod
    def _parseIngsFromScraper(cls, scraper) -> [Models.RecipeIngredient]:
        rcpIngs = []
        parser = ingreedypy.Ingreedy()

        for ingredient in scraper.ingredients():
            ingToParse = ingredient.lower()
            ingToParse = cls._stripAndedFractions(ingToParse)
            parsedIngredient = parser.parse(ingToParse)

            ing = ingToParse
            amount = ''
            unit = None
            if parsedIngredient.get('ingredient', None) is not None:
                ing = parsedIngredient['ingredient']
                if len(parsedIngredient.get('quantity', [])) > 0:
                    quantity = parsedIngredient['quantity'][0]
                    amount = quantity.get('amount', '')
                    unit = quantity.get('unit', None)

            rcpIngs.append(Models.RecipeIngredient(
                name=ing,
                amount=str(amount),
                unit=unit
            ))
        print(rcpIngs)
        return rcpIngs

    @classmethod
    def _stripAndedFractions(cls, ingredient: str) -> str:
        return re.sub(cls.andedFraction, r"\1 \2", ingredient.lower())

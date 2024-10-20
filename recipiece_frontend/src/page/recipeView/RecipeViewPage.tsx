import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRecipeByIdQuery, useGetSelfQuery } from "../../api";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button, Card, CardContent, Checkbox, LoadingGroup } from "../../component";
import { AxiosError } from "axios";

export const RecipeViewPage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: recipe,
    isLoading: isLoadingRecipe,
    error: recipeError,
  } = useGetRecipeByIdQuery(+id!, {
    disabled: !id,
  });

  const { data: currentUser, isLoading: isLoadingCurrentUser } = useGetSelfQuery();

  /**
   * Don't allow someone who doesn't own a recipe to access a private recipe
   */
  useEffect(() => {
    if (recipeError) {
      console.log((recipeError as AxiosError).status);
    }
  }, [recipeError]);

  const isLoading = useMemo(() => {
    return isLoadingCurrentUser || isLoadingRecipe;
  }, [isLoadingCurrentUser, isLoadingRecipe]);

  const [checkedOffSteps, setCheckedOffSteps] = useState<number[]>([]);
  const [checkedOffIngredients, setCheckedOffIngredients] = useState<number[]>([]);

  const onStepChecked = useCallback(
    (stepId: number) => {
      if (checkedOffSteps.includes(stepId)) {
        setCheckedOffSteps((oldSteps) => {
          return oldSteps.filter((v) => v !== stepId);
        });
      } else {
        setCheckedOffSteps([...checkedOffSteps, stepId]);
      }
    },
    [checkedOffSteps]
  );

  const onIngredientChecked = useCallback(
    (ingId: number) => {
      if (checkedOffIngredients.includes(ingId)) {
        setCheckedOffIngredients((oldIngredients) => {
          return oldIngredients.filter((v) => v !== ingId);
        });
      } else {
        setCheckedOffIngredients([...checkedOffIngredients, ingId]);
      }
    },
    [checkedOffIngredients]
  );

  return (
    <div className="p-4">
      <div>
        <div className="grid gap-3">
          <LoadingGroup isLoading={isLoading} className="h-[40px] w-full">
            <div className="flex flex-row">
              <h1 className="text-4xl font-medium mr-auto">{recipe?.name}</h1>
              {recipe?.user_id === currentUser?.id && (
                <Button onClick={() => navigate(`/recipe/edit/${id}`)} variant="outline">
                  Edit
                </Button>
              )}
            </div>
          </LoadingGroup>
          <LoadingGroup isLoading={isLoading} className="h-[96px] w-full">
            <p>{recipe?.description}</p>
          </LoadingGroup>
        </div>

        {recipe && (
          <Accordion type="multiple">
            <AccordionItem value="ingredients">
              <AccordionTrigger>Ingredients</AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent>
                    {(recipe?.ingredients || []).map((ing) => {
                      return (
                        <div key={ing.id} className="h-8">
                          <Checkbox onClick={() => onIngredientChecked(ing.id)} className="mr-2" checked={checkedOffIngredients.includes(ing.id)} />
                          <p onClick={() => onIngredientChecked(ing.id)} className={`inline cursor-pointer ${checkedOffIngredients.includes(ing.id) ? "line-through" : ""}`}>
                            {ing.name}
                          </p>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="steps">
              <AccordionTrigger>Steps</AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CardContent>
                    {(recipe?.steps || []).map((step) => {
                      return (
                        <div key={step.id} className="mb-4">
                          <Checkbox checked={checkedOffSteps.includes(step.id)} onClick={() => onStepChecked(step.id)} className="mr-2" />
                          <p onClick={() => onStepChecked(step.id)} className={`inline cursor-pointer ${checkedOffSteps.includes(step.id) ? "line-through" : ""}`}>
                            {step.content}
                          </p>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </div>
  );
};
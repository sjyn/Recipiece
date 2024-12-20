import { CreateCookbookDialog } from "./CreateCookbook";
import { CreateShoppingListDialog } from "./CreateShoppingList";
import { DeleteRecipeDialog } from "./DeleteRecipe";
import { MobileCreateMenuDialog } from "./MobileCreateMenu";
import { MobileListCookbooksDialog } from "./MobileListCookbooks";
import { MobileListShoppingListsDialog } from "./MobileListShoppingLists";
import { ParseRecipeFromURLDialog } from "./ParseRecipeFromURL";
import { SearchRecipesDialog } from "./SearchRecipes";

export const Dialogs = {
  createCookbook: {
    component: CreateCookbookDialog,
  },
  searchRecipes: {
    component: SearchRecipesDialog,
  },
  parseRecipeFromURL: {
    component: ParseRecipeFromURLDialog,
  },
  deleteRecipe: {
    component: DeleteRecipeDialog,
  },
  createShoppingList: {
    component: CreateShoppingListDialog,
  },
  mobileCreateMenu: {
    component: MobileCreateMenuDialog,
  },
  mobileShoppingLists: {
    component: MobileListShoppingListsDialog,
  },
  mobileCookbooks: {
    component: MobileListCookbooksDialog,
  }
};

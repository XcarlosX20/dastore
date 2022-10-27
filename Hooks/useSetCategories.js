import { useDispatch } from 'react-redux'
import {
  addCategoriesAction,
  deleteCategoryAction
} from '../Actions/ActionsCompany'
const useSetCategories = () => {
  const dispatch = useDispatch()
  // const [newCat, setNewCat] = useState("");
  const addCategory = async ({ category }) => {
    dispatch(addCategoriesAction(category))
  }
  const deleteCategory = async ({ category }) => {
    dispatch(deleteCategoryAction(category))
  }
  return { deleteCategory, addCategory }
}

export default useSetCategories

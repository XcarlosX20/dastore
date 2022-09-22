import { useDispatch } from 'react-redux'
import { setInfoCompanyAction } from '../Actions/ActionsCompany'
const useSetCategories = () => {
  const dispatch = useDispatch()
  // const [newCat, setNewCat] = useState("");
  const addCategory = async ({ category, categories }) => {
    const newCategoriesArr = [...categories, category.toLowerCase()]
    await dispatch(
      setInfoCompanyAction({
        property: ['categories'],
        data: { categories: newCategoriesArr }
      })
    )
  }
  const deleteCategory = async ({ category, categories }) => {
    const categoryDeleted = categories.filter((i) => i !== category)
    await dispatch(
      setInfoCompanyAction({
        property: ['categories'],
        data: { categories: categoryDeleted }
      })
    )
  }
  return { deleteCategory, addCategory }
}

export default useSetCategories

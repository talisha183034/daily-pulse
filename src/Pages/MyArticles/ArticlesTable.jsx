import { FaCheck, FaCommentAlt, FaEye, FaQuestion, FaTimes, FaTools, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ArticlesTable = ({ data, index, handleDelete }) => {
    // hooks and states
    const { _id, title, image, tag, publisher, isPremium, status, cancelationText } = data;
    console.log("id", _id);
    console.log("text", cancelationText);
    console.log("isPremium", isPremium);
    console.log("status", status);
    const id = _id;


    return (
        <tr>
            <th>
                {index + 1}
            </th>
            <td>
                <Link to={`/articleDetails/${_id}`}>
                    <button className="btn btn-circle btn-outline btn-sm">
                        <FaEye></FaEye>
                    </button>
                </Link>
            </td>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{title}</div>
                        <div className="text-sm opacity-50">{tag}</div>
                    </div>
                </div>
            </td>
            <td>
                <div className="text-gray-600 font-bold">{publisher}</div>
            </td>
            <td>
                {
                    isPremium ?
                        <div className="text-green-600 font-bold hidden lg:flex">Yes</div> :
                        <div className="text-sky-600 font-bold hidden lg:flex">No</div>
                }
            </td>
            <td>
                {
                    status === "pending" && <p className="text-yellow-600 font-bold"><FaQuestion></FaQuestion></p>
                }
                {
                    status === "approved" && <p className="text-green-600 font-bold"><FaCheck></FaCheck></p>
                }
                {
                    status === "cancelled" &&
                    <div className="flex items-center">
                        <p className="text-red-600 font-bold mr-2">
                            <FaTimes></FaTimes>
                        </p>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        {
                            cancelationText && <>
                                <button
                                    className="btn btn-sm rounded-full"
                                    onClick={() => {
                                        // document.getElementById('my_modal_5').showModal()
                                        document.getElementById(`my_modal_${id}`).showModal()
                                    }}>
                                    <FaCommentAlt></FaCommentAlt>
                                    {
                                        console.log("text", cancelationText)
                                    }
                                </button>
                                {/* <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle"> */}
                                <dialog id={`my_modal_${id}`} className="modal modal-bottom sm:modal-middle">
                                    {
                                        console.log("text", cancelationText)

                                    }
                                    <div className="modal-box">
                                        <p className="py-4 text-xl font-semibold">{cancelationText}</p>
                                        <div className="modal-action">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn text-red-600"> {cancelationText} Go back</button>
                                            </form>
                                        </div>
                                    </div>
                                </dialog>
                            </>
                        }


                    </div>
                }
            </td>
            <td>
                <Link to={`/updateArticle/${_id}`}>
                    <button className="btn btn-circle btn-outline btn-sm">
                        <FaTools></FaTools>
                    </button>
                </Link>
            </td>
            <td>
                <button onClick={() => handleDelete(_id)} className="btn btn-circle btn-outline btn-sm">
                    <FaTrash className="text-red-600"></FaTrash>
                </button>
            </td>

        </tr>
    );
};

export default ArticlesTable;
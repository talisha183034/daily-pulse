import { useForm } from "react-hook-form";
import { FaCheck, FaEye, FaQuestion, FaRegTrashAlt, FaTimes, FaTrash, FaTrashAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ArticleRow = ({ data, index, handleUpdate, handleDelete, update, refetch }) => {
    // hooks & states
    const axiosSecure = useAxiosSecure();
    const { _id, title, image, tag, publisher, isPremium, status } = data;
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        const cancelationText = data.cancelationText;
        axiosSecure.put(`/cancelationUpdate/${_id}`, { cancelationText })
            .then(res => {
                const data = res.data;
                console.log("cancelation feedback", data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `The article is canceled by the admin`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                    navigate();
                }
            })
    }


    return (
        <tr>
            <th className="hidden md:table-cell">
                {index + 1}
            </th>
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
            <td className="hidden md:table-cell">
                <div className="text-gray-600 font-bold">{publisher}</div>
            </td>
            <td className="hidden md:table-cell">
                {
                    isPremium ?
                        <div className="text-green-600 font-bold hidden lg:flex">Yes</div>
                        : <div className="text-blue-600 font-bold hidden lg:flex">No</div>

                }
            </td>
            <td>
                <div className="dropdown dropdown-first">
                    <label tabIndex={0}>
                        {
                            status === "pending" && <button className="text-yellow-600 font-bold"><FaQuestion></FaQuestion></button>
                        }
                        {
                            status === "approved" && <p className="text-green-600 font-bold"><FaCheck></FaCheck></p>
                        }

                        {
                            status === "cancelled" && <p className="text-red-600 font-bold"><FaTimes></FaTimes></p>
                        }
                    </label>
                    {
                        status === "pending" && <ul tabIndex={0} className="dropdown-content z-[1] w-36 p-3 rounded-lg bg-gray-200">
                            <button onClick={() => handleUpdate(_id, update = "approved")} className="w-full btn btn-ghost text-green-600 font-bold">Approve</button>
                            <button className="w-full btn btn-ghost text-red-600 font-bold" onClick={() => document.getElementById('my_modal_5').showModal()}>Cancel</button>
                            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Send cancelation feedback!</h3>
                                    <div className="pt-3">
                                        <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                                            <textarea
                                                {...register("cancelationText", { required: true })}
                                                type="textarea"
                                                placeholder="Cancelation feedback"
                                                className="textarea textarea-bordered textarea-md w-full" >
                                            </textarea>
                                            {/* if there is a button in form, it will close the modal */}
                                            <button
                                                type="submit"
                                                onClick={() => handleUpdate(_id, update = "cancelled")}
                                                className="btn btn-ghost text-red-600 font-bold mt-3">
                                                Confirm cancelation
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </ul>
                    }

                </div>
            </td>
            <td className="hidden md:table-cell">
                <Link to={`/articleDetails/${_id}`}>
                    <button className="btn btn-circle btn-outline btn-sm">
                        <FaEye></FaEye>
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

export default ArticleRow;
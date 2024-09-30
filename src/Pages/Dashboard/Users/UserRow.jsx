import { FaRegTrashAlt } from "react-icons/fa";

const UserRow = ({ data, index, handleUpdate, handleDelete, update }) => {
    const { _id, name, image, email, role, premiumUser } = data;
    return (
        <tr>
            <th className="hidden lg:table-cell">
                {index + 1}
            </th>
            <td className="hidden md:table-cell">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                    </div>
                </div>
            </td>
            <td>
                <div className="text-gray-600 font-bold text-[11px] sm:text-base">{email}</div>
            </td>
            <td className="hidden md:table-cell">
                {
                    premiumUser === "true" ?
                        <p className="text-pink-600 font-bold">Premium</p> :
                        <p className="text-blue-600 font-bold">Regular</p>
                }
            </td>
            <td>
                {
                    role === "admin" ?
                        <p className="text-green-600 font-bold">{role}</p>
                        :
                        <button onClick={() => handleUpdate(_id, update = "admin", name)} className="text-yellow-600 font-bold">make admin</button>
                }
            </td>
            <td>
                <button onClick={() => handleDelete(_id)} className="btn btn-circle btn-outline btn-sm">
                    <FaRegTrashAlt></FaRegTrashAlt>
                </button>
            </td>

        </tr>
    );
};

export default UserRow;
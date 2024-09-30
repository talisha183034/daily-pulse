import { FaRegTrashAlt } from "react-icons/fa";

const PublisherRow = ({ data, index, handleDelete }) => {
    const { _id, publisher, publisherImage, email } = data;
    return (
        <tr>
            <th className="hidden md:table-cell">
                {index + 1}
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={publisherImage} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{publisher}</div>
                    </div>
                </div>
            </td>
            <td className="hidden md:table-cell">
                <div className="text-gray-600 font-bold">{email}</div>
            </td>
            <td>
                <button onClick={() => handleDelete(_id, publisher)} className="btn btn-circle btn-outline btn-sm">
                    <FaRegTrashAlt></FaRegTrashAlt>
                </button>
            </td>

        </tr>
    );
};

export default PublisherRow;
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { config, access_token } from "../../../util/apiCallConfig";
import NotAuthorized from "../../../components/NotAuthorized";
import bg from "../../../public/bg.jpg";
import toast, { Toaster } from "react-hot-toast";

export default function Add({ user_id }) {
	const useNav = useRouter();
	const [data, setData] = useState({
		name: "",
		desc: "",
	});

	const handleChange = ({ target: { name, value } }) => {
		setData({ ...data, [name]: value });
	};

	const addNewRepository = async (e) => {
		e.preventDefault();
		try {
			await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/repository/${user_id}`,
				data,
				config
			);
			toast.success("New Repository Created", { position: "bottom-center" });
			setTimeout(() => {
				useNav.back();
			}, 2000);
		} catch (error) {
			toast.error(error, { position: "bottom-center" });
		}
	};

	return (
		<>
			{access_token ? (
				<div className="flex justify-center items-center h-screen w-full relative">
					<Image
						className="opacity-20 blur-sm"
						src={bg}
						layout="fill"
						objectFit="cover"
						placeholder="blur"
						alt="bg"
					/>
					<div className="flex rounded-lg bg-white bg-opacity-30 backdrop-filter backdrop-blur-xl p-4 justify-center items-center relative">
						<form onSubmit={addNewRepository}>
							<div className="form-floating mb-3 xl:w-96 relative">
								<label
									htmlFor="floatingName"
									className="form-label inline-block mb-2 text-gray-700 text-xl">
									Repository name
								</label>
								<input
									className="form-control
                                    block
                                    w-full
                                    px-4
                                    py-2
                                    text-xl
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									id="floatingName"
									autoComplete="off"
									required
									type="text"
									name="name"
									onChange={handleChange}
								/>
							</div>
							<div className="form-floating mb-3 xl:w-96 relative">
								<label
									htmlFor="floatingDesc"
									className="form-label inline-block mb-2 text-gray-700 text-xl">
									Repository description
								</label>
								<input
									className="form-control
                                    block
                                    w-full
                                    px-4
                                    py-2
                                    text-xl
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
									id="floatingDesc"
									autoComplete="off"
									required
									type="text"
									name="desc"
									onChange={handleChange}
								/>
							</div>
							<div className="flex space-x-2 justify-center relative">
								<button
									type="submit"
									data-mdb-ripple="true"
									data-mdb-ripple-color="light"
									className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out -mr-40">
									Save Data
								</button>
							</div>
						</form>
					</div>
					<Toaster />
				</div>
			) : (
				<NotAuthorized />
			)}
		</>
	);
}

export async function getServerSideProps(context) {
	const { user_id } = context.query;
	// console.log(context.query);

	return {
		props: {
			user_id,
		},
	};
}

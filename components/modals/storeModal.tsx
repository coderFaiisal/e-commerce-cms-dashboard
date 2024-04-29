// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import * as z from 'zod';

// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Modal } from '@/components/ui/modal';

// // import { useCreateStoreMutation } from "@/redux/features/store/storeApi";

// import { Loader } from 'lucide-react';

// export const StoreModal = () => {
//   const [loading, setLoading] = useState(false);

//   // const [createStore] = useCreateStoreMutation();

//   // const { isOpen } = useAppSelector((state: any) => state.store);
//   // const dispatch = useAppDispatch();
//   // const onClose = () => dispatch(handleClose());

//   const formSchema = z.object({
//     name: z.string().min(2),
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     setLoading(true);

//     // const res: any = await createStore(values);

//     // if (res?.data?._id) {
//     //   notify('succss', 'Store created successfully');
//     //   router.push(`/${res.data._id}`);
//     //   form.reset({ name: '' });
//     // } else if (res?.error) {
//     //   toast('error', res?.error?.message);
//     // }

//     setLoading(false);
//   };

//   return (
//     <Modal
//       title="Create Store"
//       description="Add a new store to manage categories and products"
//       // isOpen={isOpen}
//       // onClose={onClose}
//     >
//       <div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input disabled={loading} placeholder="Store" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className=" pt-6 space-x-2 flex items-center justify-end ">
//               <Button
//                 disabled={loading}
//                 type="button"
//                 variant="outline"
//                 // onClick={onClose}
//               >
//                 Cancel
//               </Button>
//               <Button disabled={loading} type="submit">
//                 {loading ? (
//                   <>
//                     Continue
//                     <Loader size={20} className="animate-spin" />
//                   </>
//                 ) : (
//                   'Continue'
//                 )}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </Modal>
//   );
// };

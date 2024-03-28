import MDEditor from '@uiw/react-md-editor';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { MdOutlineComment } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { useGet } from '../../hook/useFetch';
import { IBlog } from '../../api/models/blog.interface';
import { axiosInstance } from '../../api/axios.instance';
import { IoSend } from 'react-icons/io5';
import { useState } from 'react';
import { useAppSelector } from '../../redux/hook';
import { IoIosMore } from 'react-icons/io';
import { FaPen, FaTrash } from 'react-icons/fa6';
import { IComment } from '../../api/models/comment.interface';
import { useTranslation } from 'react-i18next';
const Detail = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const [blog, setBlog] = useGet<IBlog>(`blog/${id}`)
  const [comment, setComment] = useState<string>('')
  const [editComment, setEditComment] = useState<{ id: string, comment: string }>({ id: '', comment: '' })
  const auth = useAppSelector(state => state.auth)

  const likeHandler = () => {
    if (auth?.accessToken) {
      if (!blog?.isLike) {
        setBlog({ ...blog, isLike: true })
      } else {
        setBlog({ ...blog, isLike: false })
      }
      axiosInstance.post('/blog-like', { blog: blog?.id },
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`
          }
        })
        .then((res) => {
          console.log(res.data)
          if (res.data?.message == 'Liked') {
            setBlog({ ...blog, isLike: true, like: blog.like + 1 })
          } else {
            setBlog({ ...blog, isLike: false, like: blog.like - 1 })
          }
        })
        .catch((err: any) => {
          if (!blog?.isLike) {
            setBlog({ ...blog, isLike: false })
          } else {
            setBlog({ ...blog, isLike: true })
          }
          if (err?.response?.status == 401) {
            alert(err?.code + ': ' + err?.response.data.message)
          }
          else {
            alert(err?.code + ': ' + err?.response.data.message)
          }
        })
    }
  }

  const commentHandler = () => {

    axiosInstance.post('/blog-comment',
      {
        blog: blog?.id,
        comment: comment
      },
      {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`
        }
      }
    ).then(res => {
      blog?.comment?.push({ ...res.data, user: auth?.user })
      setBlog({ ...blog, })

    })
      .catch((err: any) => {
        alert(err?.code + ': ' + err?.response.data.message)
      })

    setComment('')
  }

  const editCommentHandler = () => {
    axiosInstance.patch(`/blog-comment/${editComment.id}`,
      {
        comment: editComment.comment
      },
      {
        headers: {
          Authorization: `Bearer ${auth?.accessToken}`
        }
      }
    ).then(res => {
      const edit = blog?.comment?.find((comment) => comment.id === editComment.id)
      const comm = blog?.comment?.filter((comment) => comment.id !== editComment.id)
      Object.assign(edit as IComment, res.data)
      comm?.push(edit as IComment)
      setBlog({ ...blog, comment: comm })
      setEditComment({ id: '', comment: '' })
    })
      .catch((err: any) => {
        alert(err?.code + ': ' + err?.response.data.message)
      })
  }

  const deleteCommentHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.value
    const agree = confirm('Are sure to delete this comment?')
    if (agree) {
      axiosInstance.delete(`/blog-comment/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`
          }
        }
      ).then(res => {
        if (res.status) {
          const comm = blog?.comment?.filter((comment) => comment.id !== id)
          setBlog({ ...blog, comment: comm })
        }
      })
        .catch((err: any) => {
          alert(err?.code + ': ' + err?.response.data.message)
        })
    }
  }

  return (

    <div className="min-h-screen flex flex-col items-center pb-20 bg-cover">
      <div className='max-w-6xl w-full pt-12 pb-2 flex border-b-2 border-slate-600'>
        <Link to='../' className='flex items-center gap-1 text-lg'><BiArrowBack /><span className='font-bayon'>{t('all_articles',{ns:'button'})}</span></Link>
      </div>
      <article>
        <h1 className='text-left leading-relaxed font-bold text-2xl text-ellipsis line-clamp-2'>
          {blog?.title}
        </h1>
        <div className='flex justify-between items-center'>
          <span className="block text-slate-400 font-semibold text-sm py-1">{(new Date(blog?.createdAt as string).toDateString())}</span>
          <div className="pt-1 flex gap-3 items-center p-1 text-lg">
            <button className="flex gap-1 items-center" onClick={likeHandler}>
              {blog?.isLike ? <AiFillLike className='text-green-600' /> : <AiOutlineLike />}{blog?.like}
            </button>
            <a href='#comment' className="flex gap-1 items-center"><MdOutlineComment />{blog?.comment?.length || 0}</a>
          </div>
        </div>
        <hr className=" bg-slate-400 h-[2.5px] my-1" />
        <img
          className="w-full aspect-[16/4] m-auto object-contain bg-transparent mb-2"
          src={blog?.thumbnail?.url}
          alt="16x9"
        />
        <MDEditor.Markdown
          source={blog?.article || ''}
          className='bg-transparent'
        />
      </article>

      {/* comment section */}
      <div className="p-3 border-2 mt-6 w-full border-green-500 rounded-md space-y-2 max-w-6xl" id='comment'>
        <h3 className="border-b-2 pb-1 capitalize">{blog?.comment?.length} {t('comments',{ns:'button'})}</h3>
        <div className={`border-2 p-2 rounded-md flex items-center gap-0${auth?.accessToken ? '' : ' cursor-no-drop'}`}>
          <textarea
            className={`resize-none outline-none flex-auto ${auth?.accessToken ? '' : '[visibility:_hidden]'}`}
            cols={30}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className='ml-3 text-2xl' onClick={commentHandler}><IoSend /></button>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto h-full space-y-2 relative" >
          {
            blog?.comment?.sort((a, b) => new Date(a.createdAt as string).getTime() - new Date(b.createdAt as string).getTime())?.map((comment, index) =>
                <div className="gap-2 flex items-center" key={index}>
                  <img src={comment.user?.profileImage?.url || ''}
                    className="h-10 w-10 gap-1 object-cover rounded-full bg-slate-300"
                  />
                  <div className="border-2 border-green-500 bg-green-50 max-w-full rounded-lg leading-3 py-1 px-2 inline-block">
                    <div className="text-xs flex gap-1 items-center">
                      <p className="text-green-600 flex gap-1">
                        {comment.user?.firstname} {comment.user?.lastname}
                        {comment?.user?.id == auth?.user?.id && <span className=' text-red-400'>(You)</span>}
                      </p>
                      •
                      <span className="text-gray-500">{new Date(comment.createdAt as string).toLocaleString()}</span>

                      {
                        comment?.user?.id == auth?.user?.id &&                     
                          <div className='relative group'>
                            <IoIosMore className='text-sm ml-2 font-bold p-[.5px] hover:border rounded-md cursor-pointer' />
                            <div className='hidden group-hover:block space-y-1 border p-2 absolute bg-green-100 border-green-500 rounded-md -right-7 -top-[.3rem]'>
                              <FaPen className='text-xs cursor-pointer'
                                onClick={() => setEditComment({ id: comment?.id || '', comment: comment?.comment || '' })} />
                              <button
                                value={comment.id}
                                onClick={deleteCommentHandler}>
                                <FaTrash className='text-xs cursor-pointer text-red-500' />
                              </button>
                            </div>
                          </div>
                      }
                    </div>
                    {
                      editComment.id === comment.id ?
                        <>
                          <div className='border-2 p-2 rounded-md flex items-center gap-0'>
                            <textarea
                              className={`resize-none text-sm outline-none bg-transparent flex-auto h-full`}
                              value={editComment.comment}
                              onChange={(e) => setEditComment({ id: editComment.id, comment: e.target.value })}
                            />
                            <button className='ml-3 text-md' onClick={editCommentHandler}><IoSend /></button>
                          </div>
                          <button
                            onClick={() => setEditComment({ id: '', comment: '' })}
                            className='text-[.75rem] mt-1 text-red-500 underline'
                          >
                            Cancel
                          </button>
                        </>
                        : <p className="text-black text-sm break-words">{comment?.comment}</p>
                    }
                  </div>
                </div>
              )
          }

        </div>
      </div>
    </div>
  )
}

export default Detail

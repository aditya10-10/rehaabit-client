import React from 'react'
import { Editor } from "@tinymce/tinymce-react";
import { v4 as uuidv4 } from 'uuid';
import { uploadImageToCloudinary } from '../../utils/cloudinaryutil';

const EditorContainer = ({content, handleEditorChange}) => {
    const handleImageUpload = async (blobInfo, progress) => {
        try {
            console.log('Uploading image to Cloudinary...');
            const secureUrl = await uploadImageToCloudinary(blobInfo.blob());
            console.log('Image uploaded successfully:', secureUrl);
            return secureUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    return (
        <div>
            <Editor
                apiKey={process.env.REACT_APP_TINYCLOUD_API_KEY}
                initialValue={content}
                value={content}
                onEditorChange={(newContent, editor) => {
                    handleEditorChange(newContent);
                }}
                init={{
                    plugins: [
                        "anchor",
                        "autolink",
                        "charmap",
                        "codesample",
                        "emoticons",
                        "image",
                        "link",
                        "lists",
                        "media",
                        "searchreplace",
                        "table",
                        "visualblocks",
                        "wordcount",
                        "preview",
                        "fullscreen",
                        "code",
                        "imagetools",
                    ],
                    toolbar:
                        "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | " +
                        "bullist numlist outdent indent | link image | " +
                        "table tabledelete | tableprops tablerowprops tablecellprops | " +
                        "tableinsertrowbefore tableinsertrowafter tabledeleterow | " +
                        "tableinsertcolbefore tableinsertcolafter tabledeletecol | " +
                        "tablecellvalign tablecellborderwidth tablecellborderstyle",
                    table_toolbar: "tabledelete | tableprops tablerowprops tablecellprops | " +
                        "tableinsertrowbefore tableinsertrowafter tabledeleterow | " +
                        "tableinsertcolbefore tableinsertcolafter tabledeletecol",
                    table_appearance_options: true,
                    table_grid: true,
                    table_resize_bars: true,
                    table_default_attributes: {
                        border: '1'
                    },
                    table_default_styles: {
                        width: '80%',
                        'border-collapse': 'collapse',
                        'min-height': '20px',
                        'align-items': 'center'
                    },
                    table_sizing_mode: 'fixed',
                    table_responsive_width: true,
                    table_cell_class_list: [
                        {title: 'None', value: ''},
                        {title: 'Center', value: 'text-center'},
                        {title: 'Left', value: 'text-left'},
                        {title: 'Right', value: 'text-right'}
                    ],
                    menubar: "file edit view insert format tools table help",
                    height: 500,
                    branding: false,
                    content_style: `
                        body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }
                        img { max-width: 100%; height: auto; }
                        img.aligncenter { display: block; margin: 0 auto; }
                        img.alignleft { float: left; margin: 0 1em 0.5em 0; }
                        img.alignright { float: right; margin: 0 0 0.5em 1em; }
                        
                        table { 
                            border-collapse: collapse; 
                            width: 80%; 
                            margin: 1em auto;
                            table-layout: fixed;
                            align-items: center;
                        }
                        table td, table th { 
                            border: 1px solid #ddd; 
                            padding: 16px;
                            height: 50px !important;    
                            min-height: 50px !important; 
                            vertical-align: top;
                            position: relative;
                            overflow: visible;           
                            word-wrap: break-word;        
                        }
                        table tr { 
                            height: 50px !important;     
                            min-height: 50px !important; 
                        }
                        .text-center { text-align: center; }
                        .text-left { text-align: left; }
                        .text-right { text-align: right; }
                        td[data-mce-selected], th[data-mce-selected] { 
                            background-color: #b4d7ff !important;
                        }
                        figure.image {
                            display: inline-block;
                            border: 1px solid #ccc;
                            margin: 0 2px 0 1px;
                            background: #f8f8f8;
                        }
                        figure.image img {
                            margin: 8px 8px 0 8px;
                        }
                        figure.image figcaption {
                            margin: 6px 8px 6px 8px;
                            text-align: center;
                        }
                    `,
                    block_formats:
                        "Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3; Header 4=h4; Header 5=h5; Header 6=h6",
                    images_upload_handler: handleImageUpload,
                    image_title: true,
                    image_description: true,
                    image_caption: true,
                    automatic_uploads: true,
                    images_upload_credentials: true,
                    image_advtab: true,
                    image_dimensions: true,
                    images_reuse_filename: false,
                    setup: (editor) => {
                        editor.on('BeforeSetContent', (e) => {
                            const bookmark = editor.selection.getBookmark(2, true);
                            editor.bookmark = bookmark;
                        });

                        editor.on('SetContent', (e) => {
                            if (editor.bookmark) {
                                editor.selection.moveToBookmark(editor.bookmark);
                                editor.bookmark = null;
                            }
                        });

                        editor.on('NodeChange', (e) => {
                            editor.save();
                        });
                    },
                    paste_data_images: true,
                    forced_root_block: 'p',
                    verify_html: false,
                }}
            />
        </div>
    );
}

export default EditorContainer

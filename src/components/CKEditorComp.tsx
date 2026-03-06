"use client";
import { apiHandler } from "@/api/apiHandler";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Alignment,
  BlockQuote,
  Bold,
  ClassicEditor,
  Code,
  CodeBlock,
  Editor,
  EditorConfig,
  Essentials,
  EventInfo,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Paragraph,
  Table,
  TableCellProperties,
  TableProperties,
  TableToolbar,
  TodoList,
  Underline,
  Undo,
} from "ckeditor5";
import { memo, useEffect, useRef, useState } from "react";

interface CKEditorCompProps {
  value?: string;
  onChange?: (data: any) => void;
  maxChars?: number;
  editor?: any;
  config?: EditorConfig;
  showImageUpload?: boolean;
  handleDeletedBlogFile?: (doc_paths: string[]) => void;
}

class MyUploadAdapter {
  loader: any;
  uploadBasePath: string;
  constructor(loader: any, uploadBasePath: string = "/api/v1") {
    this.loader = loader;
    this.uploadBasePath = uploadBasePath;
  }

  upload() {
    return this.loader.file.then(
      (file: File) =>
        new Promise(async (resolve, reject) => {
          const data = new FormData();
          data.append("doc_path", file, file.name); // ✅ Add filename explicitly

          try {
            const { data: response } = await apiHandler.blog.blogContentUpload(data);

            let imageUrl;
            if (response?.url) {
              imageUrl = response?.url;
            } else if (response?.data) {
              // Use configurable base path
              imageUrl = `${this.uploadBasePath}${response?.data}`;
            } else {
              return reject("No URL in upload response");
            }

            resolve({
              default: imageUrl,
            });
          } catch (error) {
            reject(error?.message);
          }
        }),
    );
  }

  abort() {}
}

function MyCustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new MyUploadAdapter(loader, "/api/v1"); // 👈 Configure here
  };
}

const CKEditorComp = ({
  value,
  onChange,
  maxChars,
  editor = ClassicEditor,
  showImageUpload = false,
  config = {},
  handleDeletedBlogFile = (doc_paths: string[]) => {},
}: CKEditorCompProps) => {
  const initialConfig: EditorConfig = {
    ...config,
    toolbar: [
      "heading",
      "bold",
      "italic",
      "underline",
      "alignment",
      "fontColor",
      "fontBackgroundColor",
      "fontSize",
      "fontFamily",
      "blockQuote",
      "numberedList",
      "bulletedList",
      showImageUpload ? "imageUpload" : "",
      "link",
      "insertTable",
      "undo",
      "redo",
    ],
    htmlSupport: {
      allow: [{ name: /.*/, attributes: true, classes: true, styles: true }],
    },
    link: {
      addTargetToExternalLinks: true,
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", "tableProperties", "tableCellProperties"],
    },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    plugins: [
      Undo,
      FontFamily,
      FontSize,
      FontColor,
      FontBackgroundColor,
      Bold,
      Italic,
      Underline,
      Table,
      TableToolbar,
      TableProperties,
      TableCellProperties,
      Code,
      Link,
      BlockQuote,
      CodeBlock,
      List,
      ListProperties,
      TodoList,
      Essentials,
      Paragraph,
      Alignment,
      Heading,
      ...(showImageUpload ? [Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, ImageResize, LinkImage] : []),
    ],
    ...(showImageUpload
      ? {
          extraPlugins: [MyCustomUploadAdapterPlugin],
          image: {
            upload: {
              types: ["jpeg", "png", "webp", "jpg", "avif", "heic", "heif"],
            },
            resizeOptions: [
              {
                name: "resizeImage:original",
                label: "Original",
                value: null,
              },
              {
                name: "resizeImage:50",
                label: "50%",
                value: "50",
              },
            ],
            toolbar: [
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
              "imageStyle:alignLeft",
              "|",
              "resizeImage",
              "toggleImageCaption",
              "imageTextAlternative",
            ],
            resizeUnit: "%",
            insert: {
              integrations: ["upload", "assetManager", "url"],
              type: "auto",
            },
          },
        }
      : undefined),
  };

  const [charCount, setCharCount] = useState(0);
  const [loadOnce, setLoadOnce] = useState(false);
  const imageRef = useRef<string[]>([]);

  const extractImages = (html: string) => {
    if (typeof window === "undefined") return [];
    const doc = new DOMParser().parseFromString(html, "text/html");
    const imgs = doc.querySelectorAll("img");
    return Array.from(imgs)
      .map((img) => img.getAttribute("src"))
      .filter((src): src is string => !!src);
  };

  useEffect(() => {
    if (value && !loadOnce) {
      let initialContent = value;
      if (maxChars) {
        initialContent = initialContent.replaceAll(/<[^>]*>/g, "");
        initialContent = initialContent.replaceAll(/&nbsp/g, "");
        setCharCount(initialContent?.length);
      }
      setLoadOnce(true);
      imageRef.current = extractImages(value);
    } else {
      if (value === "") {
        setLoadOnce(false);
        setCharCount(0);
        imageRef.current = [];
      } else if (value) {
        imageRef.current = extractImages(value);
      }
    }
  }, [value, loadOnce, maxChars]);

  const handleChange = (_: EventInfo, editor: Editor) => {
    const content = editor.getData();
    let initialContent = content;

    if (showImageUpload) {
      // Handle Image Deletion
      const currentImages = extractImages(content);
      const deletedImages = imageRef.current.filter((src) => !currentImages.includes(src));

      // Store the transformed result
      const pathsToDelete = deletedImages.filter((src) => src.includes("/api/v1")).map((src) => src.split("/api/v1")[1]);

      if (pathsToDelete.length && handleDeletedBlogFile) {
        handleDeletedBlogFile(pathsToDelete);
      }

      imageRef.current = currentImages;
    }

    if (maxChars) {
      initialContent = initialContent.replaceAll(/<[^>]*>/g, "");
      initialContent = initialContent.replaceAll(/&nbsp/g, "");
      setCharCount(initialContent?.length);
      if (initialContent?.length <= maxChars) {
        onChange(content);
      } else {
        editor.execute("undo");
      }
    } else {
      onChange(content);
    }
  };

  return (
    <div className="relative !z-0">
      <CKEditor
        editor={editor}
        config={{
          ...initialConfig,
          initialData: value || "",
        }}
        data={value}
        onChange={(event, editor) => {
          if (maxChars) {
            if (charCount <= maxChars) handleChange(event, editor);
          } else {
            handleChange(event, editor);
          }
        }}
      />
      {maxChars && (
        <div className={`mt-2 text-right text-sm ${charCount > maxChars ? "text-red-500" : "text-gray-500"}`}>
          {charCount}/{maxChars} characters
        </div>
      )}
    </div>
  );
};

export default memo(CKEditorComp);

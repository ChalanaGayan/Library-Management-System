import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message, Select } from "antd";
import { useAuth } from "../contexts/AuthContext"; // adjust the import according to your file structure

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
}

interface BookTableProps {
  darkMode: boolean;
}

const BookTable: React.FC<BookTableProps> = ({ darkMode }) => {
  const { isAuthenticated, logout } = useAuth(); // use authentication context
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [form] = Form.useForm();

  const BASE_URL = import.meta.env.VITE_BASE_URL; // access the base URL from environment variable

  useEffect(() => {
    if (isAuthenticated) {
      fetchBooks();
    } else {
      message.error("You need to be logged in to view books.");
      logout();
    }
  }, [isAuthenticated]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${BASE_URL}/api/books`, {
        headers: {
          Authorization: `Bearer ${token}`, // add authorization header
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Book[] = await response.json();
      setBooksData(data);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      message.error("Failed to fetch books!");
    } finally {
      setLoading(false);
    }
  };

  //switch between add and edit book
  const showModal = () => {
    setIsModalVisible(true);
    setCurrentBook(null);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // validate form inputs
      const token = localStorage.getItem("authToken");

      if (currentBook) {
        // update Book - Put
        const response = await fetch(
          `${BASE_URL}/api/books/${currentBook.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ ...values, id: currentBook.id }), //adding id to the req body
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update the book");
        }

        message.success("Book updated successfully!");
      } else {
        // add a book - Post
        const response = await fetch(`${BASE_URL}/api/books`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("Failed to add the book");
        }

        message.success("Book added successfully!");
      }
      fetchBooks();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to save book:", error);
      message.error("Failed to save book!");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (book: Book) => {
    setCurrentBook(book);
    form.setFieldsValue(book);
    setIsModalVisible(true);
  };

  //Delete book
  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("authToken");
      await fetch(`${BASE_URL}/api/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      console.error("Failed to delete book:", error);
      message.error("Failed to delete book!");
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
    },
    {
      title: "Published Year",
      dataIndex: "publishedYear",
      key: "publishedYear",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Book) => (
        <div className="space-x-2">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      className={`relative ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <Table
        columns={columns}
        dataSource={booksData}
        loading={loading}
        rowKey="id"
        className="mb-10"
      />
      <Button
        type="primary"
        onClick={showModal}
        className={`absolute top-3 right-6 ${
          darkMode ? "bg-blue-600" : "bg-blue-400"
        }`}
      >
        Add Book
      </Button>
      <Modal
        title={currentBook ? "Edit Book" : "Add Book"} //to change modal titile
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="author"
            label="Author"
            rules={[{ required: true, message: "Please input the author!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="isbn"
            label="ISBN"
            rules={[{ required: true, message: "Please input the ISBN!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="publishedYear"
            label="Published Year"
            rules={[
              { required: true, message: "Please select the published year!" },
            ]}
          >
            <Select>
              {" "}
              {/* Dropdown for selecting year */}
              {Array.from(
                { length: new Date().getFullYear() - 1499 },
                (_, i) => 1500 + i
              ).map((year) => (
                <Select.Option key={year} value={year}>
                  {year}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BookTable;

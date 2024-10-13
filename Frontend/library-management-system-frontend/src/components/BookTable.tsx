import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message, Select } from "antd";

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
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5006/api/books");
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

  // show modal for add, edit a book
  const showModal = () => {
    setIsModalVisible(true);
    setCurrentBook(null);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields(); // Validate form inputs.
      if (currentBook) {
        // put req
        await fetch(`http://localhost:5006/api/books/${currentBook.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        message.success("Book updated successfully!");
      } else {
        //post req for add a book
        await fetch("http://localhost:5006/api/books", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        message.success("Book added successfully!");
      }
      fetchBooks();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to save book:", error);
      message.error("Failed to save book!");
    }
  };

  //handle modal closing
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEdit = (book: Book) => {
    setCurrentBook(book);
    form.setFieldsValue(book);
    setIsModalVisible(true);
  };

  // Function to handle deleting a book.
  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:5006/api/books/${id}`, {
        method: "DELETE", // Send DELETE request.
      });
      message.success("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      console.error("Failed to delete book:", error);
      message.error("Failed to delete book!");
    }
  };

  // Columns of design table - antd
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
        loading={loading} //add a loading icon
        rowKey="id" // use unique key for each book
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
        title={currentBook ? "Edit Book" : "Add Book"} //change modla title
        visible={isModalVisible} // Control modal visibility.
        onOk={handleOk} // Handle form submission.
        onCancel={handleCancel} // Handle modal cancellation.
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

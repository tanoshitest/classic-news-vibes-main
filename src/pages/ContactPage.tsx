import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactPage = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        fullName: "",
        company: "",
        department: "",
        email: "",
        phone: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", formData);
        alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="bg-white py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        {/* Header */}
                        <div className="border-b-2 border-black px-6 py-4">
                            <h1 className="text-2xl font-bold text-black">{t("contact_title")}</h1>
                        </div>

                        {/* Form */}
                        <div className="p-6">
                            <p className="text-sm text-gray-600 mb-6">
                                {t("contact_intro")}<br />
                                {t("contact_intro_line2")} (<span className="text-red-600">*</span> {t("contact_required")})
                            </p>

                            <form onSubmit={handleSubmit}>
                                {/* Full Name */}
                                <div className="grid grid-cols-12 gap-4 mb-4">
                                    <div className="col-span-12 md:col-span-3 bg-gray-600 text-white px-4 py-3 flex items-center">
                                        <label htmlFor="fullName" className="text-sm font-medium">
                                            {t("contact_fullname")} <span className="text-red-400">*</span>
                                        </label>
                                    </div>
                                    <div className="col-span-12 md:col-span-9 flex items-center">
                                        <Input
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder={t("contact_fullname_placeholder")}
                                            required
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                {/* Company/Organization */}
                                <div className="grid grid-cols-12 gap-4 mb-4">
                                    <div className="col-span-12 md:col-span-3 bg-gray-600 text-white px-4 py-3 flex items-center">
                                        <label htmlFor="company" className="text-sm font-medium">
                                            {t("contact_company")} <span className="text-red-400">*</span>
                                        </label>
                                    </div>
                                    <div className="col-span-12 md:col-span-9">
                                        <Input
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder={t("contact_company_placeholder")}
                                            required
                                            className="w-full mb-1"
                                        />
                                        <p className="text-xs text-red-600">
                                            {t("contact_company_warning")}<br />
                                            {t("contact_company_warning2")}
                                        </p>
                                    </div>
                                </div>

                                {/* Department */}
                                <div className="grid grid-cols-12 gap-4 mb-4">
                                    <div className="col-span-12 md:col-span-3 bg-gray-600 text-white px-4 py-3 flex items-center">
                                        <label htmlFor="department" className="text-sm font-medium">
                                            {t("contact_department")}
                                        </label>
                                    </div>
                                    <div className="col-span-12 md:col-span-9 flex items-center">
                                        <Input
                                            id="department"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            placeholder={t("contact_department_placeholder")}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                {/* Email Address */}
                                <div className="grid grid-cols-12 gap-4 mb-4">
                                    <div className="col-span-12 md:col-span-3 bg-gray-600 text-white px-4 py-3 flex items-center">
                                        <label htmlFor="email" className="text-sm font-medium">
                                            {t("contact_email")} <span className="text-red-400">*</span>
                                        </label>
                                    </div>
                                    <div className="col-span-12 md:col-span-9">
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder={t("contact_email_placeholder")}
                                            required
                                            className="w-full mb-1"
                                        />
                                        <p className="text-xs text-red-600">
                                            {t("contact_email_warning")}<br />
                                            {t("contact_email_warning2")}
                                        </p>
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div className="grid grid-cols-12 gap-4 mb-4">
                                    <div className="col-span-12 md:col-span-3 bg-gray-600 text-white px-4 py-3 flex items-center">
                                        <label htmlFor="phone" className="text-sm font-medium">
                                            {t("contact_phone")}
                                        </label>
                                    </div>
                                    <div className="col-span-12 md:col-span-9 flex items-center">
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder={t("contact_phone_placeholder")}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="grid grid-cols-12 gap-4 mb-6">
                                    <div className="col-span-12 md:col-span-3 bg-gray-600 text-white px-4 py-3">
                                        <label htmlFor="message" className="text-sm font-medium">
                                            {t("contact_message")} <span className="text-red-400">*</span>
                                        </label>
                                    </div>
                                    <div className="col-span-12 md:col-span-9">
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder={t("contact_message_placeholder")}
                                            required
                                            className="w-full min-h-[150px]"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center">
                                    <Button
                                        type="submit"
                                        className="bg-[#9f1239] hover:bg-[#7f1d1d] text-white px-32 py-6 text-lg font-semibold w-full"
                                    >
                                        {t("contact_submit")}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;

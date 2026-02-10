import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

const FinancialDataSection = () => {
    // Mock Data
    const data = [
        {
            type: "currency",
            code: "USD",
            name: "Đô la Mỹ",
            buy: "25,310",
            sell: "25,680",
            change: "+0.15%",
            trend: "up",
            icon: "🇺🇸"
        },
        {
            type: "currency",
            code: "JPY",
            name: "Yên Nhật",
            buy: "163.52",
            sell: "171.12",
            change: "-0.21%",
            trend: "down",
            icon: "🇯🇵"
        },
        {
            type: "gold",
            code: "SJC",
            name: "Vàng SJC (1L)",
            buy: "78.50",
            sell: "80.50",
            unit: "Triệu/Lượng",
            change: "+0.50",
            trend: "up",
            icon: "🏆"
        }
    ];

    return (
        <section className="py-12 bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4">

                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold uppercase text-gray-900 border-l-4 border-primary pl-3">
                        Thông tin Tài chính
                    </h2>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>Cập nhật: {new Date().toLocaleDateString('vi-VN')}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.map((item, index) => (
                        <div key={index} className="bg-white p-6 rounded-sm shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{item.icon}</span>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">{item.code}</h3>
                                        <p className="text-sm text-gray-500">{item.name}</p>
                                    </div>
                                </div>
                                <div className={`flex items-center gap-1 text-sm font-medium ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                    {item.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                    {item.change}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Mua vào</p>
                                    <p className="text-xl font-bold text-gray-900">{item.buy}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Bán ra</p>
                                    <p className="text-xl font-bold text-gray-900">{item.sell}</p>
                                </div>
                            </div>

                            {item.unit && (
                                <div className="mt-2 text-right text-xs text-gray-400">
                                    Đơn vị: {item.unit}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FinancialDataSection;

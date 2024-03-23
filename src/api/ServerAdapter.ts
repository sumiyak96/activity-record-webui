import { Category, RegisterSubCategoryRequest, UpdateSubCategoryRequest } from "../category/Category";

class ServerAdapter {
  private baseUrl: string;

  private constructor() {
    this.baseUrl = process.env.REACT_APP_API_BASE_URL!;
  }

  private static instance: ServerAdapter;

  public static getInstance(): ServerAdapter {
    if (!ServerAdapter.instance) {
      ServerAdapter.instance = new ServerAdapter();
    }
    return ServerAdapter.instance;
  }

  public async registerActivity(activity: any): Promise<void> {
    // API呼び出しの実装
    const response = await fetch(`${this.baseUrl}/activity/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(activity),
    });

    if (!response.ok) {
      throw new Error('API call failed');
    }
  }

  public async getCategories(customerId: string): Promise<any> {
    try {
      const url = new URL(`${this.baseUrl}/category/categories`);

      // URLSearchParamsを使ってクエリパラメータを追加
      url.search = new URLSearchParams({ customerId }).toString();
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw new Error('Failed to fetch categories');
    }
  }

  public async registerCategory(category: Category): Promise<void> {
    // API呼び出しの実装
    const response = await fetch(`${this.baseUrl}/category/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      throw new Error('API call failed');
    }
  }

  public async updateCategory(category: Category): Promise<void> {
    // API呼び出しの実装
    const response = await fetch(`${this.baseUrl}/category/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      throw new Error('API call failed');
    }
  }

  public async registerSubCategory(registerRequest: RegisterSubCategoryRequest): Promise<void> {
    const response = await fetch(`${this.baseUrl}/subCategory/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerRequest),
    });

    if (!response.ok) {
      throw new Error('API call failed');
    }
  }
  public async updateSubCategory(updateRequest: UpdateSubCategoryRequest): Promise<void> {
    const response = await fetch(`${this.baseUrl}/subCategory/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateRequest),
    });

    if (!response.ok) {
      throw new Error('API call failed');
    }
  }


  public async getActivities(customerId: string): Promise<any> {
    try {
      const url = new URL(`${this.baseUrl}/activity/activities`);

      // URLSearchParamsを使ってクエリパラメータを追加
      url.search = new URLSearchParams({ customerId }).toString();
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      throw new Error('Failed to fetch categories');
    }
  }
}

export default ServerAdapter.getInstance();

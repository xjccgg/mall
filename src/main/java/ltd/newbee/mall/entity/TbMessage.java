package ltd.newbee.mall.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 
 * </p>
 *
 * @author xujichuang
 * @since 2023-05-04
 */
@Data
@EqualsAndHashCode(callSuper = false)
@TableName(value = "tb_message", autoResultMap = true)
public class TbMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @TableField(value = "create_time")
    private Date createTime;

    @TableField("message")
    private String message;

    @TableField("contact_information")
    private String contactInformation;


}
